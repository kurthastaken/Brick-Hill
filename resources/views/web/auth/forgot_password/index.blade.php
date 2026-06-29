<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.default', [
    'title' => 'Forgot Password'
])

@section('content')
    <div class="col-1-3 push-1-3">
        <div class="card">
            <div class="top red">Forgot Password</div>
            <div class="content" style="text-align:center;">
                <form action="{{ route('auth.forgot_password.send') }}" method="POST">
                    @csrf
                    <input style="width:100%;box-sizing:border-box;" type="email" name="email" placeholder="Email" required>
                    <div style="height:5px;"></div>
                    <button class="red" type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    </div>
@endsection