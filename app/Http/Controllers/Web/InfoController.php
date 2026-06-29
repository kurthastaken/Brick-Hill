namespace App\Http\Controllers\Web;

use App\Models\StaffUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InfoController extends Controller
{
    public function terms()
    {
        return view('web.info.terms');
    }

    public function privacy()
    {
        return view('web.info.privacy');
    }

    public function staff()
    {
        $staffUsers = StaffUser::where('user_id', '!=', 0)->orderBy('created_at', 'ASC')->paginate(25);;

        return view('web.info.staff')->with([
            'staffUsers' => $staffUsers
        ]);
    }
}