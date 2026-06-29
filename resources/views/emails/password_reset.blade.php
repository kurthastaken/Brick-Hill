<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

<span>A password reset request has been issued for your account! If this wasn't you, you should just ignore this message.</span>
<br>
<br>
<span>If it was, click the link below to reset your password:</span>
<br>
<a href="{{ route('auth.forgot_password.change', $token) }}">{{ route('auth.forgot_password.change', $token) }}</a>
<br>
<br>
<span>The link will expire in 1 hour, or until you use it.</span>
<br>
<br>
<span>Make sure to use a secure and memorable password.</span>
<br>
<span>Happy Hilling!</span>
<br>
<span style="color:#888888;">{{ config('site.name') }}</span>