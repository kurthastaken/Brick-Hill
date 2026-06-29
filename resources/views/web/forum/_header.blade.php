<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@auth
    <div class="card forum-links inline">
        <div class="content">
            <div class="inline">
                @if (config('site.rules_thread_id'))
                    <a href="{{ route('forum.thread', config('site.rules_thread_id')) }}">Rules</a>
                    <span class="divide"></span>
                @endif
                <div class="inline">
                    <a href="#">Bookmarked</a>
                </div>
                <a href="#">My Posts</a>
                <a href="#">Drafts</a>
            </div>
        </div>
    </div>
@endauth