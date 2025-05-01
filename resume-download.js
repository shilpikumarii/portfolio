function initResumeDownload() {
  const downloadBtn = document.getElementById('download-resume');
  
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', function(e) {
    const btn = this;
    const originalText = btn.innerHTML;
    
  
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Preparing Download...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      console.log('Resume downloaded at: ', new Date().toLocaleString());
      
      setTimeout(() => {
        alert('Thank you for downloading my resume!');
      }, 300);
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', initResumeDownload);