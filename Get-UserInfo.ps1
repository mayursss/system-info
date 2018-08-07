try {
    $out =   [environment]::GetEnvironmentVariables() | 
    Select-Object Name,Value
    
} catch [System.Management.Automation.RuntimeException] {
    $myError = @{
        Message = $_.Exception.Message
        Type = $_.FullyQualifiedErrorID
    }
    $out = @{ Error = $myError }
}
write-host $out
ConvertTo-Json $out -Compress