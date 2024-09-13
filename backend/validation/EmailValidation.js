const EmailVarify = async(email) => {
    const Email = [...email]
    let split
    if (Email.includes("@")) {
        split = email.split("@")[1].split(".")
    }
    if (!Email.includes(".") || !Email.includes("@")) {
        return false
    }
    if (!split.includes("gmail") || !split.includes("com")) {
        return false
    }
    return true
}

module.exports = EmailVarify