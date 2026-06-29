<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.default', [
    'title' => 'Create Message'
])

@section('content')
    <div class="col-10-12 push-1-12">
        <div class="card">
            <div class="top blue">Send Message to {{ $user->username }}</div>
            <div class="content" style="padding:15px;">
                <form action="{{ route('account.inbox.create') }}" method="POST">
                    @csrf
                    <input type="hidden" name="id" value="{{ $user->id }}">
                    <input type="hidden" name="type" value="message">
                    <input style="width:100%;margin-bottom:10px;box-sizing:border-box;" name="title" placeholder="Title">
                    <textarea style="width:100%;height:250px;box-sizing:border-box;" name="body" placeholder="Hey {{ $user->username }}"></textarea>
                    <button class="forum-button blue" style="margin:10px auto 10px auto;display:block;" type="submit">SEND</button>
                </form>
            </div>
        </div>
    </div>
@endsection