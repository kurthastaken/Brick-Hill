<!--

in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,





-->

@extends('layouts.default', [
    'title' => 'Trades'
])

@section('meta')
    <meta
        name="routes"
        data-process="{{ route('account.trades.process') }}"
    >
    <meta
        name="user-info"
        data-id="{{ Auth::user()->id }}"
    >
@endsection

@section('js')
    <script src="{{ js_file('account/trades/index') }}"></script>
@endsection

@section('content')
    <div class="col-1-3">
        <select class="width-100" id="category">
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
            <option value="history">History</option>
        </select>
        <div id="trades" style="max-height:650px;overflow-y:auto;"></div>
    </div>
    <div class="col-2-3">
        <div id="trade"></div>
    </div>
    <div class="modal text-center" style="display:none;" data-modal="accept">
        <div class="modal-content">
            <span class="close" data-modal-close="accept">×</span>
            <span>Accept Trade</span>
            <hr>
            <span>Are you sure you want to accept this trade?</span>
            <div class="modal-buttons">
                <form action="{{ route('account.trades.process') }}" method="POST" style="display:inline;">
                    @csrf
                    <input type="hidden" name="id" id="acceptModalId">
                    <button class="button green" style="margin-right:10px;" name="action" value="accept">Accept</button>
                </form>
                <button type="button" class="cancel-button" data-modal-close="accept">Cancel</button>
            </div>
        </div>
    </div>
@endsection