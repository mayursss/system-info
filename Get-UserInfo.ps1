try {
    $out = @{}
    $out.'User Name' = $env:USERNAME   
    $out.'Domain' = $env:USERDOMAIN
    $out.'Home Drive' = $env:HOMEDRIVE
    $out.'Profile' = $env:USERPROFILE

} catch [System.Management.Automation.RuntimeException] {
    $myError = @{
        Message = $_.Exception.Message
        Type = $_.FullyQualifiedErrorID
    }
    $out = @{ Error = $myError }
}
ConvertTo-Json $out -Compress