namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumView extends Model
{
    use HasFactory;

    protected $table = 'forum_views';

    protected $fillable = [
        'thread_id',
        'user_id'
    ];
}