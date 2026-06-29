<?php
namespace App\Jobs;

use App\Models\Item;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class NotifyWebhooks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $id;
    public $is_new;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($id, $isNew)
    {
        $this->id = $id;
        $this->is_new = $isNew;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $item = Item::where('id', '=', $this->id);

        if ($item->exists()) {
            $item = $item->first();
            $site = config('site.name');
            $webhooks = config('discord.item_notifier_webhooks');
            $url = route('shop.item', $item->id);
            $prices = [];
            $embed = [
                'title' => $item->name,
                'url' => $url,
                'description' => "[View on {$site}]({$url})",
                'thumbnail' => ['url' => $item->thumbnail()],
            ];

            if (!$this->is_new) {
                $message = 'Item updated!';
            } else {
                $message = 'New item!';

                if ($item->special_type)
                    $message = 'New special item!';
                else if ($item->isTimed())
                    $message = 'New timed item!';
            }

            if ($item->onsale()) {
                if ($item->price_bucks > 0)
                    $prices[] = [
                        'inline' => true,
                        'name' => 'Bucks',
                        'value' => $item->price_bucks
                    ];

                if ($item->price_bits > 0)
                    $prices[] = [
                        'inline' => true,
                        'name' => 'Bits',
                        'value' => $item->price_bits
                    ];
            }

            if (!empty($prices))
                $embed['fields'] = $prices;

            sleep(5);

            foreach ($webhooks as $webhook)
                Http::post($webhook, [
                    'content' => "@everyone {$message}",
                    'embeds' => [$embed]
                ]);
        }
    }
}
