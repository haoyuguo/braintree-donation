window.onload = function() {
    $("body").css("cursor", "progress");

    $.get('./btd.php', function(token) {
        $("body").css("cursor", "default");

        var form = document.querySelector('#checkout-form');
        var submit = document.querySelector('input[type="submit"]');

        braintree.client.create({
            authorization: token
        }, function (clientErr, clientInstance) {
            if (clientErr) {
                // Handle error in client creation
                return;
            }

            braintree.hostedFields.create({
                client: clientInstance,
                styles: {
                    'input': {
                        'font-size': '14pt'
                    },
                    'input.invalid': {
                        'color': 'red'
                    },
                    'input.valid': {
                        'color': 'green'
                    }
                },
                fields: {
                    number: {
                        selector: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '123'
                    },
                    expirationDate: {
                        selector: '#expiration-date',
                        placeholder: '10 / 2019'
                    },
                    postalCode: {
                        selector: '#postal-code',
                        placeholder: '12345'
                    }
                }
            }, function (hostedFieldsErr, hostedFieldsInstance) {
                if (hostedFieldsErr) {
                    // Handle error in Hosted Fields creation
                    return;
                }

                submit.removeAttribute('disabled');

                form.addEventListener('submit', function (event) {
                    event.preventDefault();

                    submit.setAttribute('disabled', true);

                    var resultSection = $('#transaction-result');

                    resultSection.text('Processing transaction ....');
                    resultSection.attr('class', 'bg-warning');

                    hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                        if (tokenizeErr) {
                            // Handle error in Hosted Fields tokenization
                            resultSection.text('Transaction error!');
                            resultSection.attr('class', 'bg-danger');

                            return;
                        }

                        // Put `payload.nonce` into the `payment-method-nonce` input, and then
                        // submit the form. Alternatively, you could send the nonce to your server
                        // with AJAX.

                        var nonce = payload.nonce;
                        nonce = 'fake-valid-nonce';

                        document.querySelector('input[name="payment-method-nonce"]').value = nonce;

                        // Use ajax to submit form to server to process, then come back to update status
                        $.post('./btd.php', $('#checkout-form').serialize(), function(result) {
                            var data = JSON.parse(result);

                            if(data.success) {
                                resultSection.text('Thank you for your generous support.  The transaction was successful!');
                                resultSection.attr('class', 'bg-success');
                                console.log(data.transaction);
                            }
                            else {
                                resultSection.text('Transaction failed!');
                                resultSection.attr('class', 'bg-danger');
                            }
                        });
                    });
                }, false);

            });
        });
    });
};
