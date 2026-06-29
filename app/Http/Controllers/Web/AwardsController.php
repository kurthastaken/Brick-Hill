namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AwardsController extends Controller
{
    public function index()
    {
        $awards = ['Membership' => [], 'Community' => [], 'Excellence' => []];
        $categories = [
            [
                'name' => 'Membership',
                'color' => 'red',
                'award_ids' => [6, 7, 8, 4]
            ],
            [
                'name' => 'Community',
                'color' => 'green',
                'award_ids' => [1, 2, 3]
            ],
            [
                'name' => 'Excellence',
                'color' => 'orange',
                'award_ids' => [5]
            ]
        ];

        foreach ($categories as $category)
            foreach ($category['award_ids'] as $id)
                $awards[$category['name']][] = config('awards')[$id];

        return view('web.awards.index')->with([
            'awards' => $awards,
            'categories' => $categories
        ]);
    }
}