// Style.css
function updateClock() {
    const now = new Date();
    const currentDate = now.toLocaleDateString("vi-VN");
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("time-title").textContent = `iOS Support (${timeString} - ${currentDate})`;
}
updateClock();
setInterval(updateClock, 1000);

// button Copy
document.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const input = e.target.previousElementSibling;
        if (input?.tagName === 'INPUT') {
            navigator.clipboard.writeText(input.value).catch(console.error);
        }
    }
});

// Gift Tiktok
function accessURL() {
    const inputData = document.getElementById("inputData").value; // Lấy giá trị từ input
    const baseURL = "https://script.google.com/macros/s/AKfycbyN1toeJtrj0aVuluAtHcwO9NkbBo0ZYHcioRDOKwimlKOaa_2jTDkHFv20wMi6lJGQMA/exec?"; // URL cơ bản
    let selectedData = "";
    // Lấy giá trị từ radio button được chọn (chỉ có một)
    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    if (radioButtons.length > 0) {
        selectedData = radioButtons[0].value; // Giá trị của radio button được chọn
    }
    // Ghép cả giá trị vào URL với "hoanganh" ở giữa
    const fullURL = baseURL + encodeURIComponent(selectedData) +'='+ encodeURIComponent(inputData);
    // Gửi yêu cầu mà không chuyển hướng
    fetch(fullURL)
        .then(response => {
            if (response.ok) {
                return response.text(); // Hoặc response.json() tùy thuộc vào định dạng mà bạn mong đợi
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            alert(`Thành công : ${data}`); // Hiển thị dữ liệu nhận được trong thông báo
        })
        .catch(error => {
            console.error('Có vấn đề với hoạt động fetch:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!'); // Thông báo khi có lỗi
        });
}
// JavaScript Backup
document.addEventListener('DOMContentLoaded', () => {
    const deviceKeysInput = document.getElementById('deviceKeysInput');
    const bookmarkletbackup = document.getElementById('bookmarkletbackup');
    function generateBookmarklet() {
        const lines = deviceKeysInput.value.trim().split('\n').filter(line => line.trim() !== '');
        const keyCount = lines.length;
        if (keyCount > 0) {
            const keys = [];
            const names = [];
            lines.forEach(line => {const parts = line.trim().split(' ');const name = parts[0]; const key = parts.slice(1).join(' '); if (name && key) {names.push(name);keys.push(`"${key}"`);}});
            const formattedKeys = keys.join(',');
            const formattedNames = JSON.stringify(names);
            let defaultName = names.length === 1 ? names[0] : `${names[0]} - ${names[names.length - 1]}`;
            let customName = prompt("Nhập tên backup tùy chỉnh:", defaultName);
            if (!customName || customName.trim() === "") {customName = defaultName;}
            const bookmarkletCode = `(async function() {
                const deviceIDs = [${formattedKeys}], deviceNames = ${formattedNames}, now = new Date();
                let completedBackups = 0, fakeCleanTriggered = false, backupCountdown = 60, spacePressed = false, fakeCleanDone = false, fakeCleanRunning = false;
                const timestamp = \`\${String(now.getDate()).padStart(2, '0')}-\${String(now.getMonth() + 1).padStart(2, '0')}\`;
                for (let i = 0; i < deviceIDs.length; i++) {const deviceID = deviceIDs[i], deviceName = deviceNames[i]; 
                let sessions = await fetch(\`https://ifake.pro/manager/device/\${deviceID}/sessions\`, {headers: {accept: "*/*", "content-type": "application/x-www-form-urlencoded; charset=UTF-8"},body: "action=get_sessions_from_server",method: "POST", mode: "cors", credentials: "include"});sessions = await sessions.json();let totalSessions = (sessions.html.match(/Folder:\\s*([A-F0-9-]{36})<\\/span>/g) || []).length;
                const backupName = \`\${deviceName}-\${timestamp}-\${totalSessions + 1}\`;
                console.log(\`%c🔄 Tên Backup: \${backupName}".\`, "color: blue; font-weight: bold;");
                await fetch(\`https://ifake.pro/manager/device/\${deviceID}/sessions\`, {headers: {accept: "*/*", "content-type": "application/x-www-form-urlencoded; charset=UTF-8"},body: \`action=backup&name=\${backupName}\`,method: "POST", mode: "cors", credentials: "include"});}
                console.log("%c⌛ Đang BackUp - Check iPhone.", "color: red; font-weight: bold;");
                console.log("%c⚙️ Bấm [ y ] Để FakeClean luôn.", "color: brown; font-weight: bold;");
                console.log("%c⚙️ Đợi 60s Auto FakeClean.", "color: brown; font-weight: bold;");
                let backupInterval = setInterval(async () => {if (backupCountdown-- <= 0) {clearInterval(backupInterval);console.log("%c✅ Backup Xong !", "color: green; font-weight: bold;");            if (!fakeCleanTriggered) {fakeCleanTriggered = true;console.log("%c🧹 Bắt đầu Fake & Clean!", "color: red; font-weight: bold;");performFakeClean(deviceIDs);}}}, 1000);
                window.addEventListener("keydown", (event) => {if (event.key.toLowerCase() === "y" && !fakeCleanTriggered) {clearInterval(backupInterval);fakeCleanTriggered = true;fakeCleanRunning = true;console.log("%c✅ Backup Xong !", "color: green; font-weight: bold;");console.log("%c🧹 Bắt đầu Fake & Clean!", "color: red; font-weight: bold;");performFakeClean(deviceIDs);}
                if (event.code === "Space" && !spacePressed && !fakeCleanDone && !fakeCleanRunning) {spacePressed = true;if (backupCountdown > 0) {console.log(\`%c⏳ FakeClean Sau: \${backupCountdown}s\`, "color: orange; font-weight: bold;");}setTimeout(() => {spacePressed = false;}, 1000);}});
                async function performFakeClean(deviceIDs) {for (const deviceID of deviceIDs) {await fetch(\`https://ifake.pro/manager/device/\${deviceID}/tools\`, {headers: {accept: "*/*","content-type": "application/x-www-form-urlencoded; charset=UTF-8"},body: "action=fake_clean",method: "POST",mode: "cors",credentials: "include"});}console.log("%c✅ Fake Xong. Check trên iPhone nhé!", "color: green; font-weight: bold;");console.log("%c!--------------------------------!", "color: red; font-weight: bold;");}})();`;
            const codefakeclean = `javascript:(function(){const deviceIDs = [${formattedKeys}];(async function(){for (const deviceID of deviceIDs) {await fetch("https://ifake.pro/manager/device/"+deviceID+"/tools", {headers: { accept: "*/*", "content-type": "application/x-www-form-urlencoded; charset=UTF-8" },referrer: "https://ifake.pro/manager/device/" + deviceID,referrerPolicy: "strict-origin-when-cross-origin",body: "action=fake_clean",method: "POST",mode: "cors",credentials: "include"});}console.log("%c✅ Fake Xong. Check trên iPhone nhé!", "color: green; font-weight: bold;");})();})();`;
            const encodedBookmarklet = `javascript:${encodeURIComponent(bookmarkletCode)}`;
            bookmarkletbackup.href = encodedBookmarklet;
            bookmarkletbackup.textContent = `${customName} Tạo Phôi`;
            bookmarkletfakeclean.href = codefakeclean;
            bookmarkletfakeclean.textContent = `${customName} FakeClean`;
        } else {
            bookmarkletbackup.href = "#";
            bookmarkletbackup.textContent = "Bạn chưa nhập Key kìa ^^";
            bookmarkletfakeclean.href = "#";
            bookmarkletfakeclean.textContent = "Bạn chưa nhập Key kìa ^^";
        }
    }
    deviceKeysInput.addEventListener('input', generateBookmarklet);
});
