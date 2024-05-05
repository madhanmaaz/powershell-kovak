
const OBJ = {}

OBJ.sliceMethod = (psCode) => {
    const variable1 = randomString(1)
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;<=>?@[\\]^_{|}~\\t\\n\\r\\v\\f ' + "`'"

    function builder(data) {
        let value = ""
        for (let index = 0; index < data.length; index++) {
            const charIndex = chars.indexOf(data[index])
            value += `$${variable1}[${charIndex}]`

            if (index != (data.length - 1)) value += '+'
        }

        return value
    }

    return `$${variable1}='${chars}'';&(${builder("iex")})(${builder(psCode)})`
}

OBJ.spaceMethod = (psCode) => {
    function builder(data) {
        let value = ""
        for (let index = 0; index < data.length; index++) {
            const spaceCount = data[index].charCodeAt()
            value += `([char]('${' '.repeat(spaceCount)}'.Length))`
            if (index != (data.length - 1)) value += '+'
        }

        return value
    }

    return `&(${builder('iex')})(${builder(psCode)})`
}

OBJ.binaryMethod = (psCode) => {
    const variable1 = randomString(1)
    const variable2 = randomString(2)
    const variable3 = randomString(3)
    const variable4 = randomString(4)

    function builder(data) {
        const value = []
        for (let char of data) {
            value.push(`'${char.charCodeAt().toString(2).padStart(8, '0')}'`)
        }
        return `@(${value.join(',')})`
    }

    return `function ${variable4}($${variable1}){$${variable3}='';foreach ($${variable2} in $${variable1}) {$${variable3}+=[char][Convert]::ToInt32($${variable2}, 2)};return $${variable3}};&(${variable4}(${builder('iex')}))(${variable4}(${builder(psCode)}))`
}

OBJ.unicodeMethod = (psCode) => {
    const variable1 = randomString(5)
    const variable2 = randomString(5)

    function builder(data) {
        let value = ''
        for (let index = 0; index < data.length; index++) {
            value += `(${variable1}(0x${data[index].codePointAt(0).toString(16)}))`
            if (index != (data.length - 1)) value += '+'
        }

        return value
    }

    return `function ${variable1}($${variable2}) {return [char]::ConvertFromUtf32($${variable2})}&(${builder('iex')})(${builder(psCode)})`
}

OBJ.boolMethod = (psCode) => {
    const variable1 = randomString(1)
    const variable2 = randomString(2)
    const variable3 = randomString(3)
    const variable4 = randomString(4)
    const variable5 = randomString(5)
    const variable6 = randomString(6)

    function builder(data) {
        const value = []
        for (let char of data) {
            const innerValue = []
            for (let bin of char.charCodeAt().toString(2).padStart(8, '0')) {
                if (bin == '1') {
                    innerValue.push('$true')
                } else {
                    innerValue.push('$false')
                }
            }
            value.push(`@(${innerValue.join(',')})`)
        }

        return `@(${value.join(',')})`
    }

    return `function ${variable1}($${variable2}) {$${variable3} = "";foreach($${variable4} in $${variable2}){$${variable6} = "";foreach($${variable5} in $${variable4}) {if($${variable5}) {$${variable6} += "1";} else {$${variable6} += "0";}}$${variable3} += ([char][Convert]::ToInt32($${variable6}, 2));}return $${variable3}}&(${variable1}(${builder('iex')}))(${variable1}(${builder(psCode)}))`
}

OBJ.decimalMethod = (psCode) => {
    function builder(data) {
        let value = ""
        for (let index = 0; index < data.length; index++) {
            const decimal = data[index].charCodeAt()
            value += `([char](${decimal}))`
            if (index != (data.length - 1)) value += '+'
        }

        return value
    }

    return `&(${builder('iex')})(${builder(psCode)})`
}

OBJ.zeroMethod = (psCode) => {
    const variable1 = randomString(1)
    const variable2 = randomString(2)
    const variable3 = randomString(3)
    const variable4 = randomString(4)
    const variable5 = randomString(5)

    function builder(data) {
        let value = []
        for (let index = 0; index < data.length; index++) {
            const spaceCount = data[index].charCodeAt()
            value.push(`@(${'0'.repeat(spaceCount).split('').join(",")})`)
        }

        return `@(${value.join(',')})`
    }

    return `function ${variable1}($${variable2}) {$${variable3} = "";foreach($${variable4} in $${variable2}){$${variable3} += [char]($${variable4}.Length);}return $${variable3}}&(${variable1}(${builder('iex')}))(${variable1}(${builder(psCode)}))`
}

// random string
function randomString(len) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let value = ""
    for (let index = 0; index < len; index++) {
        value += chars[Math.floor(Math.random() * chars.length)]
    }

    return value
}


module.exports = OBJ