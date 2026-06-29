namespace App\Http\Controllers\Web\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function index()
    {
        return view('web.account.billing');
    }
}