 // Style.css
 var agent = navigator.userAgent;
 var ios = agent.match(/.*; CPU (?:iPhone )?OS ([0-9_]*) like Mac OS X[;)]/);
 ios = ios == null ? '7.0' : ios[1].replace(/_/g, '.');
 
 var stylesheet = document.getElementById("stylesheet");
 
 if (ios.match(/^[78]($|\.)/) != null) {
     stylesheet.setAttribute("href", "./function/styles.css");
 } else {
     stylesheet.setAttribute("href", "./assets/legacy.css");
 }
 
 // button Copy
 document.addEventListener('DOMContentLoaded', () => {const buttons = document.querySelectorAll('button');buttons.forEach(button => {button.addEventListener('click', () => {const input = button.previousElementSibling;if (input && input.tagName === 'INPUT') {navigator.clipboard.writeText(input.value).catch(err => {console.error('Không thể sao chép:', err);});}});});});
 
 
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
             lines.forEach(line => {
                 const parts = line.trim().split(' ');
                 const name = parts[0];
                 const key = parts.slice(1).join(' ');
                 if (name && key) {names.push(name);keys.push(`"${key}"`);}
             });
             const formattedKeys = keys.join(',');
             const codebackup = `javascript: void function() {(async function() {const deviceIDs = [${formattedKeys}];const now = new Date();let fakeCleanTriggered = false;const timestamp = \`\${String(now.getDate()).padStart(2, '0')}-\${String(now.getMonth() + 1).padStart(2, '0')}\`;for (let i = 0; i < deviceIDs.length; i++) {const deviceID = deviceIDs[i];const deviceNumber = i + 1;let sessions = await fetch(\`https://ifake.pro/manager/device/\${deviceID}/sessions\`, {headers: {accept: "*/*","content-type": "application/x-www-form-urlencoded; charset=UTF-8"},referrer: \`https://ifake.pro/manager/device/\${deviceID}\`,referrerPolicy: "strict-origin-when-cross-origin",body: "action=get_sessions_from_server",method: "POST",mode: "cors",credentials: "include"});sessions = await sessions.json();const d = sessions.html;const e = d.match(/Folder:\s*([A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12})<\\/span>/g);let totalSessions = e ? e.length : 0;const backupName = \`M\${deviceNumber}-\${timestamp}-STT-\${totalSessions + 1}\`;console.log(\`%c🔄 Thiết Bị BackUp: \${deviceIDs.length} | 🗒️: "\${backupName}".\`, "color: blue; font-weight: bold;");await fetch(\`https://ifake.pro/manager/device/\${deviceID}/sessions\`, {headers: {accept: "*/*","content-type": "application/x-www-form-urlencoded; charset=UTF-8"},referrer: \`https://ifake.pro/manager/device/\${deviceID}\`,referrerPolicy: "strict-origin-when-cross-origin",body: \`action=backup&name=\${backupName}\`,method: "POST",mode: "cors",credentials: "include"});}console.log("%c⌛ Thực Hiện BackUp (60S)", "color: orange; font-weight: bold;");let backupCountdown = 60;let backupInterval = setInterval(async () => {if (backupCountdown-- <= 0) {clearInterval(backupInterval);console.log("%c✅ Backup Xong !", "color: green; font-weight: bold;");if (!fakeCleanTriggered) {fakeCleanTriggered = true;console.log("%c🧹 Bắt đầu Fake & Clean!", "color: red; font-weight: bold;");performFakeClean(deviceIDs);}}}, 1000);window.addEventListener("keydown", async (event) => {if (event.key.toLowerCase() === "y" && !fakeCleanTriggered) {clearInterval(backupInterval);fakeCleanTriggered = true;console.log("%c✅ Backup Xong !", "color: green; font-weight: bold;");console.log("%c🧹 Bắt đầu Fake & Clean!", "color: blue; font-weight: bold;");performFakeClean(deviceIDs);}});async function performFakeClean(deviceIDs) {for (const deviceID of deviceIDs) {await fetch(\`https://ifake.pro/manager/device/\${deviceID}/tools\`, {headers: {accept: "*/*","content-type": "application/x-www-form-urlencoded; charset=UTF-8"},referrer: \`https://ifake.pro/manager/device/\${deviceID}\`,referrerPolicy: "strict-origin-when-cross-origin",body: "action=fake_clean",method: "POST",mode: "cors",credentials: "include"});}setTimeout(() => {console.log("%c✅ Fake Xong. Check trên iPhone nhé!", "color: green; font-weight: bold;");console.log("%c!--------------------------------!","color: red; font-weight: bold;");}, 30000);}})();}();`;
             const codefakeclean = `javascript:void function(){void function(){void function(){const a=[${formattedKeys}];for(let b,c=0;c<a.length;c++)b=a[c],fetch("https://ifake.pro/manager/device/"+b+"/tools",{headers:{accept:"*/*","content-type":"application/x-www-form-urlencoded; charset=UTF-8"},referrer:"https://ifake.pro/manager/device/"+b,referrerPolicy:"strict-origin-when-cross-origin",body:"action=fake_clean",method:"POST",mode:"cors",credentials:"include"})}()}()}();`;
             bookmarkletbackup.href = codebackup;
             bookmarkletbackup.textContent = `Backup: Máy${names.join('-')}`;
             bookmarkletfakeclean.href = codefakeclean;
             bookmarkletfakeclean.textContent = `Fake & Clean: Máy${names.join('-')}`;
         } else {
             bookmarkletbackup.href = "#";
             bookmarkletbackup.textContent = "Bạn chưa nhập Key kìa ^^";
             bookmarkletfakeclean.href = "#";
             bookmarkletfakeclean.textContent = "Bạn chưa nhập Key kìa ^^";
         }
     }
     deviceKeysInput.addEventListener('input', generateBookmarklet);
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
 
