Function CopyDirectory ([string]$Uri, [string]$Folder) {
  Get-ChildItem $Folder |
  ForEach-Object {
    $target = '{0}/{1}' -f $Uri, $_.Name 
    if ( $_.PSIsContainer ) {
      CopyDirectory -Uri $target -Folder $_.FullName
    }
    else {
      aws s3 cp $_.FullName $target 
      write-host ( 'File: {0} to {1}' -f $_.FullName, $target)
    }
  }
}

$sourcedir = "public"
$baseUri = "s3://log73.vavruska.cz"
CopyDirectory -Uri $baseUri -Folder $sourcedir