namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            $adminRoutes = Route::as('admin.')
                ->middleware('staff')
                ->namespace('App\Http\Controllers\Admin');

            if (config('site.route_domains.admin_site')) {
                $adminRoutes->domain(config('site.route_domains.admin_site'));
            } else {
                $adminRoutes->prefix(config('site.admin_prefix'));
            }

            $adminRoutes->group(base_path('routes/admin.php'));

            Route::prefix('api')
                ->middleware('web')
                ->namespace('App\Http\Controllers\API')
                ->group(base_path('routes/api.php'));

            $webRoutes = Route::middleware('web')
                ->namespace('App\Http\Controllers\Web');

            if (config('site.route_domains.main_site')) {
                $webRoutes->domain(config('site.route_domains.main_site'));
            }

            $webRoutes->group(base_path('routes/web.php'));

            if (file_exists(base_path('routes/faker.php'))) {
                $fakerRoutes = Route::as('faker.')
                    ->prefix('welcome')
                    ->middleware('web')
                    ->namespace('App\Http\Controllers\Faker');

                if (config('site.route_domains.main_site')) {
                    $fakerRoutes->domain(config('site.route_domains.main_site'));
                }

                $fakerRoutes->group(base_path('routes/faker.php'));
            }
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}