<?php
/*
require_once './.env.php';
require_once './braintree-php/lib/Braintree.php';

Braintree_Configuration::environment($env);
Braintree_Configuration::merchantId($merchantId);
Braintree_Configuration::publicKey($publicKey);
Braintree_Configuration::privateKey($privateKey);

$collection = Braintree_Transaction::search([
    Braintree_TransactionSearch::status()->in(
        [
            Braintree_Transaction::SUBMITTED_FOR_SETTLEMENT,
            Braintree_Transaction::SETTLED
        ]
    )
]);


var_dump($collection);

exit();
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Braintree Sandbox Report</title>
    <link rel="stylesheet" href="bootstrap_3.3.5_css_bootstrap.min.css" />

    <script src="jquery-1.12.4.min.js"></script>
    <script src="bootstrap_3.3.5_js_bootstrap.min.js"></script>
</head>
<body>

<div class="container">
    <H3>Sandbox Transactions <small>(TBD)</small></H3>

    <p>This page is intended to show all transactions from the sandbox account, so that demo users can actually see the results of transactions.
        Meanwhile, if the modal shows that a transaction was successful, it should be.</p>
</div>

</body>
</html>