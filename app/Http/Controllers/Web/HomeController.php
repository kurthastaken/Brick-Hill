namespace App\Http\Controllers\Web;

use App\Models\Item;
use App\Models\User;
use App\Models\Status;
use App\Models\Inventory;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();

        return view('web.home.index')->with([
            'totalUsers' => $totalUsers
        ]);
    }

    public function dashboard()
    {
        $friends = Auth::user()->friends();
        $updates = ForumThread::where([
            ['topic_id', '=', config('site.news_topic_id')],
            ['is_deleted', '=', false]
        ])->orderBy('created_at', 'DESC')->get()->take(5);

        $statuses = Status::where([
            ['creator_id', '!=', Auth::user()->id],
            ['message', '!=', null]
        ])->whereIn('creator_id', $friends->pluck('id'))->orderBy('created_at', 'DESC')->take(10)->get();

        $feed = $statuses->map(function($status) {
            return (object) [
                'type' => 'user',
                'owner_id' => $status->creator_id,
                'user' => $status->creator,
                'date' => $status->created_at,
                'body' => $status->message
            ];
        });

        return view('web.home.dashboard')->with([
            'updates' => $updates,
            'statuses' => $statuses,
            'friends' => $friends->take(6),
            'friend_count' => $friends->count(),
            'feed' => $feed,
            'streak' => 0,
            'value' => null
        ]);
    }

    public function status(Request $request)
    {
        $this->validate($request, [
            'message' => ['max:124']
        ]);

        if ($request->message != Auth::user()->status()) {
            $status = new Status;
            $status->creator_id = Auth::user()->id;
            $status->message = $request->message;
            $status->save();
        }

        return back()->with('success_message', 'Status has been changed.');
    }
}