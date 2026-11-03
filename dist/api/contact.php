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

$name    = htmlspecialchars($input['name'] ?? '');
$email   = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars($input['phone'] ?? '');
$company = htmlspecialchars($input['company'] ?? '');
$subject = htmlspecialchars($input['subject'] ?? 'General enquiry');
$message = htmlspecialchars($input['message'] ?? '');

if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, phone and message are required']);
    exit();
}

$recipient = 'haryana.260cp@gmail.com';
$refId = 'CONT-' . date('Y') . '-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 5));
$emailSubject = "HCP Website Contact: {$subject} [{$refId}]";

$emailBody = "<html><body style='font-family: Arial, sans-serif; color: #1e293b;'>";
$emailBody .= "<h2 style='color: #023f85;'>New Contact Message ({$refId})</h2>";
$emailBody .= "<p><strong>Name:</strong> {$name}</p>";
$emailBody .= "<p><strong>Email:</strong> {$email}</p>";
$emailBody .= "<p><strong>Phone:</strong> {$phone}</p>";
if (!empty($company)) {
    $emailBody .= "<p><strong>Company:</strong> {$company}</p>";
}
$emailBody .= "<p><strong>Subject:</strong> {$subject}</p>";
$emailBody .= "<p><strong>Message:</strong><br/>" . nl2br($message) . "</p>";
$emailBody .= "<hr/><p style='font-size: 12px; color: #64748b;'>Sent from HCP Website Contact Form</p>";
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
    'message' => 'Your message has been received. Our team will contact you shortly.'
]);

