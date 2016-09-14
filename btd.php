<?php

require_once './.env.php';
require_once './braintree-php/lib/Braintree.php';

Braintree_Configuration::environment($env);
Braintree_Configuration::merchantId($merchantId);
Braintree_Configuration::publicKey($publicKey);
Braintree_Configuration::privateKey($privateKey);

if(isset($_POST['payment-method-nonce']) && ($nonce = $_POST['payment-method-nonce'])) {
    $result = [];
    $amount = $_POST['amount'];
    if ($amount >= 1) {
        $result = Braintree_Transaction::sale([
            'amount' => $amount,
            'paymentMethodNonce' => $nonce,
            'options' => [
                'submitForSettlement' => True
            ]
        ]);
    }
    echo json_encode($result);
}
else {
    echo($clientToken = Braintree_ClientToken::generate());
}


