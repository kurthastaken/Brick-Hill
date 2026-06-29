<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.default', [
    'title' => 'Awards'
])

@section('content')
    <div class="col-10-12 push-1-12">
        @forelse ($categories as $category)
            <div class="card">
                <div class="top {{ $category['color'] }}">{{ $category['name'] }}</div>
                <div class="content">
                    @forelse ($awards[$category['name']] as $key => $award)
                        <div class="award-card">
                            <img src="{{ asset("images/awards/{$award['image']}.png") }}">
                            <div class="data">
                                <div class="very-bold">{{ $award['name'] }}</div>
                                <div style="padding:1px;"></div>
                                <span>{{ $award['description'] }}</span>
                            </div>
                        </div>

                        @if ($key != count($awards[$category['name']]) - 1)
                            <hr>
                        @endif
                    @empty
                        <span>This category has no awards.</span>
                    @endforelse
                </div>
            </div>
        @empty
            <span>There are currently no award categories.</span>
        @endforelse
    </div>
@endsection