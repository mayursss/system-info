try {
    $ComputerName = "localhost"
    $out =   [System.IO.DriveInfo]::GetDrives() |
        Where-Object {$_.TotalSize} |
        Select-Object   @{Name='Name';     Expr={$_.Name}},
                        @{Name='Label';    Expr={$_.VolumeLabel}},
                        @{Name='Size(GB)'; Expr={[int32]($_.TotalSize / 1GB)}},
                        @{Name='Free(GB)'; Expr={[int32]($_.AvailableFreeSpace / 1GB)}},
                        @{Name='Free(%)';  Expr={[math]::Round($_.AvailableFreeSpace / $_.TotalSize,2)*100}},
                        @{Name='Format';   Expr={$_.DriveFormat}},
                        @{Name='Type';     Expr={[string]$_.DriveType}},
                        @{Name='Computer'; Expr={$ComputerName}}
    
} catch [System.Management.Automation.RuntimeException] {
    $myError = @{
        Message = $_.Exception.Message
        Type = $_.FullyQualifiedErrorID
    }
    $out = @{ Error = $myError }
}

ConvertTo-Json $out -Compress