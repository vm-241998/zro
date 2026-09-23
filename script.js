
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});
document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const emailTo = form.dataset.mailto || 'hello@zaikajaroori.com';
        const formData = new FormData(form);
        const fullName = (formData.get('fullName') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const phone = (formData.get('phone') || '').toString().trim();
        const enquiryType = (formData.get('enquiryType') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        const body = [
            `Full name: ${fullName}`,
            `Email: ${email}`,
            `Phone / WhatsApp: ${phone || 'Not provided'}`,
            `Enquiry type: ${enquiryType || 'General'}`,
            '',
            'Message:',
            message || 'No message provided.'
        ].join('\n');

        const subject = encodeURIComponent(`ZRØ enquiry${enquiryType ? ` - ${enquiryType}` : ''}`);
        const mailtoLink = `mailto:${emailTo}?subject=${subject}&body=${encodeURIComponent(body)}`;

        const note = form.querySelector('.form-note');
        if (note) {
            note.textContent = 'Opening your email app...';
            note.style.color = 'var(--gold2)';
        }

        window.location.href = mailtoLink;
        form.reset();
    });
});
