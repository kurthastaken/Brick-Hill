<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@if ($paginator->hasPages() || $paginator->total() > 0)
    @foreach ($elements as $element)
        @if (is_array($element))
            @foreach ($element as $page => $url)
                <a href="{{ $url }}" class="page {{ ($page == $paginator->currentPage()) ? 'active' : '' }}">{{ number_format($page) }}</a>
            @endforeach
        @endif
    @endforeach
@endif