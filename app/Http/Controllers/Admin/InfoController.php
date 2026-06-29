namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\User;
use App\Models\UserBan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InfoController extends Controller
{
    public function index()
    {
        $serverData = $this->data('server');
        $siteData = $this->data('site');

        return view('admin.info')->with([
            'siteData' => $siteData,
            'serverData' => $serverData
        ]);
    }

    public function data($type)
    {
        switch ($type) {
            case 'site':
                $totalUsers = User::count();
                $joinedToday = User::where('created_at', '>=', Carbon::now()->subDays(1))->count();
                $onlineUsers = User::where('updated_at', '>=', Carbon::now()->subMinutes(3))->count();
                $bannedUsers = UserBan::where('active', '=', true)->count();

                return [
                    'Total Users' => $totalUsers,
                    'Joined Today' => $joinedToday,
                    'Online Users' => $onlineUsers,
                    'Banned Users' => $bannedUsers
                ];
            case 'server':
                if (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN') {
                    $loadAverage = function_exists('sys_getloadavg') ? sys_getloadavg() : false;
                    $cpuUsage = is_array($loadAverage) ? $loadAverage[0] . '%' : null;
                    $ramUsage = $this->getLinuxRamUsage();
                    $uptime = $this->getLinuxUptime();
                }

                return [
                    'CPU Usage' => $cpuUsage ?? '???',
                    'RAM Usage' => $ramUsage ?? '???',
                    'PHP Version' => phpversion(),
                    'Uptime' => $uptime ?? '???'
                ];
        }
    }

    private function getLinuxRamUsage()
    {
        $memInfoPath = '/proc/meminfo';

        if (!$this->canAccessSystemFile($memInfoPath)) {
            return null;
        }

        $memInfo = @file_get_contents($memInfoPath);

        if ($memInfo === false
            || !preg_match('/^MemTotal:\s+(\d+)/m', $memInfo, $totalMatch)
            || !preg_match('/^MemAvailable:\s+(\d+)/m', $memInfo, $availableMatch)
            || (int) $totalMatch[1] === 0) {
            return null;
        }

        $total = (int) $totalMatch[1];
        $available = (int) $availableMatch[1];

        return round(($total - $available) / $total * 100) . '%';
    }

    private function getLinuxUptime()
    {
        $uptimePath = '/proc/uptime';

        if (!$this->canAccessSystemFile($uptimePath)) {
            return null;
        }

        $contents = @file_get_contents($uptimePath);

        if ($contents === false) {
            return null;
        }

        $seconds = (float) explode(' ', trim($contents))[0];

        return round($seconds / 86400, 1) . ' Days';
    }

    private function canAccessSystemFile($path)
    {
        $openBasedir = ini_get('open_basedir');

        if ($openBasedir !== false && $openBasedir !== '') {
            foreach (explode(PATH_SEPARATOR, $openBasedir) as $allowedPath) {
                $allowedPath = rtrim($allowedPath, DIRECTORY_SEPARATOR);

                if ($allowedPath !== ''
                    && ($path === $allowedPath
                        || strpos($path, $allowedPath . DIRECTORY_SEPARATOR) === 0)) {
                    return @is_readable($path);
                }
            }

            return false;
        }

        return @is_readable($path);
    }
}