<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.admin', [
    'title' => 'Info'
])

@section('content')
    <div class="card">
        <div class="card-header">Site Statistics</div>
        <div class="card-body text-center">
            <div class="row">
                @foreach ($siteData as $title => $value)
                    <div class="col-6 col-md-3">
                        <h4>{{ $value }}</h4>
                        <h5 class="text-muted">{{ $title }}</h5>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header">Server Information</div>
        <div class="card-body text-center">
            <div class="row">
                @foreach ($serverData as $title => $value)
                    <div class="col-6 col-md-3">
                        <h4>{{ $value }}</h4>
                        <h5 class="text-muted">{{ $title }}</h5>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection