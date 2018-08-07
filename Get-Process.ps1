try {
    $out =   Get-Process | 
        Select-Object @{Name='CPU'; Expr={[math]::Round($_.CPU)}},
                    @{Name='Paged Memory'; Expr={$_.PagedMemorySize64 /1024}},
                    @{Name='Total CPU Time';Expr={[string]::Format($_.TotalProcessorTime)}},
                    Id,
                    ProcessName,
                    HandleCount,
                    Description
    
} catch [System.Management.Automation.RuntimeException] {
    $myError = @{
        Message = $_.Exception.Message
        Type = $_.FullyQualifiedErrorID
    }
    $out = @{ Error = $myError }
}

ConvertTo-Json $out -Compress