<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.default', [
    'title' => 'Friends'
])

@section('content')
    <div class="col-10-12 push-1-12">
        <div class="card">
            <div class="top blue">Friends</div>
            <div class="content">
                @if ($friends->count() == 0)
                    <div style="text-align:center">
                        <span>This user does not have any friends :(</span>
                    </div>
                @else
                    <ul class="friends-list">
                        @foreach ($friends as $friend)
                            <li class="col-1-5 mobile-col-1-1">
                                <a href="{{ route('users.profile', $friend->id) }}">
                                    <div class="profile-card">
                                        <img src="{{ $friend->thumbnail() }}" style="height:150px;width:150px;">
                                        <div class="ellipsis">{{ $friend->username }}</div>
                                    </div>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>
        </div>
        <div class="pages">{{ $friends->onEachSide(1) }}</div>
    </div>
@endsection