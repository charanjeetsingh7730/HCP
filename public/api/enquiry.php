<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit();
}

$companyName     = htmlspecialchars($input['companyName'] ?? '');
$contactPerson   = htmlspecialchars($input['contactPerson'] ?? '');
$email           = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone           = htmlspecialchars($input['phone'] ?? '');
$gstNumber       = htmlspecialchars($input['gstNumber'] ?? '');
$deliveryLocation = htmlspecialchars($input['deliveryLocation'] ?? '');
$industry        = htmlspecialchars($input['industry'] ?? '');
$additionalNotes = htmlspecialchars($input['additionalNotes'] ?? '');
$items           = is_array($input['items'] ?? null) ? $input['items'] : [];

if (empty($companyName) || empty($contactPerson) || empty($email) || empty($phone) || empty($deliveryLocation) || empty($items)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required enquiry fields.']);
    exit();
}

$recipient = 'haryana.260cp@gmail.com';
$refId = 'ENQ-' . date('Y') . '-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 5));
$emailSubject = "HCP Quotation Enquiry from {$companyName} [{$refId}]";

$itemsHtml = "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse; width: 100%; border-color: #cbd5e1;'>";
$itemsHtml .= "<tr style='background-color: #f1f5f9; text-align: left;'><th>#</th><th>Product</th><th>Grade</th><th>Quantity</th><th>Preferred Make</th></tr>";

$idx = 1;
foreach ($items as $item) {
    $pName  = htmlspecialchars($item['productName'] ?? '');
    $pGrade = htmlspecialchars($item['grade'] ?? '');
    $pQty   = htmlspecialchars(($item['quantity'] ?? '') . ' ' . ($item['unit'] ?? ''));
    $pMake  = htmlspecialchars($item['preferredMake'] ?? '—');
    $itemsHtml .= "<tr><td>{$idx}</td><td><strong>{$pName}</strong></td><td>{$pGrade}</td><td>{$pQty}</td><td>{$pMake}</td></tr>";
    $idx++;
}
$itemsHtml .= "</table>";

$emailBody = "<html><body style='font-family: Arial, sans-serif; color: #1e293b;'>";
$emailBody .= "<h2 style='color: #023f85;'>New Quotation Enquiry ({$refId})</h2>";
$emailBody .= "<p><strong>Company:</strong> {$companyName}</p>";
$emailBody .= "<p><strong>Contact Person:</strong> {$contactPerson}</p>";
$emailBody .= "<p><strong>Email:</strong> {$email}</p>";
$emailBody .= "<p><strong>Phone:</strong> {$phone}</p>";
if (!empty($gstNumber)) {
    $emailBody .= "<p><strong>GST:</strong> {$gstNumber}</p>";
}
$emailBody .= "<p><strong>Delivery Location:</strong> {$deliveryLocation}</p>";
if (!empty($industry)) {
    $emailBody .= "<p><strong>Industry:</strong> {$industry}</p>";
}
if (!empty($additionalNotes)) {
    $emailBody .= "<p><strong>Notes:</strong><br/>" . nl2br($additionalNotes) . "</p>";
}
$emailBody .= "<h3>Requested Products:</h3>";
$emailBody .= $itemsHtml;
$emailBody .= "<hr/><p style='font-size: 12px; color: #64748b;'>Sent from HCP Website Quotation System</p>";
$emailBody .= "</body></html>";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: HCP Website <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'hcpchem.com') . ">\r\n";
$headers .= "Reply-To: {$email}\r\n";

$sent = @mail($recipient, $emailSubject, $emailBody, $headers);

echo json_encode([
    'success' => true,
    'referenceId' => $refId,
    'emailed' => $sent,
    'message' => 'Your quotation enquiry has been registered. Our procurement team will respond shortly.'
]);

