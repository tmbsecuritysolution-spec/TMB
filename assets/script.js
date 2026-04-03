// Script to wire contact links, maps link, and status badge
(function () {
	'use strict';

	const emailLink = document.getElementById('emailLink');
	const whatsappLink1 = document.getElementById('whatsappLink1');
	const whatsappLink2 = document.getElementById('whatsappLink2');
	const facebookLink = document.getElementById('facebookLink');
	const phoneLink1 = document.getElementById('phoneLink1');
	const phoneLink2 = document.getElementById('phoneLink2');
	const mapsLink1 = document.getElementById('mapsLink1');
	const mapsLink2 = document.getElementById('mapsLink2');
	const openBadge = document.getElementById('openBadge');


	// Default contact values — change these from HTML or via the exposed API
	const contacts = {
		email: 'mustaphataibiu@gmail.com',
		emailSubject: 'Hello from TMB Security',
		emailBody: 'السلام عليكم',
		whatsappText: 'السلام عليكم',
		facebookUrl: 'https://www.facebook.com/tmbsecuritysolution',
		whatsapp1: '+213698020140',
		whatsapp2: '+213666498480',
		phone1: '+213698020140',
		phone2: '+213666498480',
		maps1: 'https://maps.app.goo.gl/fDCoG49kJUGX9pXn6',
		maps2: 'https://maps.app.goo.gl/aaJ1qNazQYAXY1aC8?g_st=aw',
	};

	function encode(s) { return encodeURIComponent(s); }

	// Build links only when the target elements exist
	if (emailLink) {
		emailLink.href = `mailto:${contacts.email}?subject=${encode(contacts.emailSubject)}&body=${encode(contacts.emailBody)}`;
		emailLink.setAttribute('rel', 'noopener noreferrer');
	}

	function setupWhatsapp(el, num) {
		if (!el) return;
		const waPhone = (num || '').replace(/[^0-9]/g, '');
		el.href = waPhone ? `https://wa.me/${waPhone}?text=${encode(contacts.whatsappText)}` : `https://wa.me/?text=${encode(contacts.whatsappText)}`;
		el.setAttribute('rel', 'noopener noreferrer');
	}

	setupWhatsapp(whatsappLink1, contacts.whatsapp1);
	setupWhatsapp(whatsappLink2, contacts.whatsapp2);

	function setupPhone(el, phone) {
		if (!el) return;
		el.href = `tel:${phone}`;
		el.setAttribute('rel', 'noopener noreferrer');
	}

	setupPhone(phoneLink1, contacts.phone1);
	setupPhone(phoneLink2, contacts.phone2);

	if (mapsLink1) {
		mapsLink1.href = contacts.maps1;
		mapsLink1.setAttribute('rel', 'noopener noreferrer');
	}
	if (mapsLink2) {
		mapsLink2.href = contacts.maps2;
		mapsLink2.setAttribute('rel', 'noopener noreferrer');
	}



	if (facebookLink) {
		facebookLink.href = contacts.facebookUrl;
		facebookLink.setAttribute('target', '_blank');
		facebookLink.setAttribute('rel', 'noopener noreferrer');
	}

	function renderStatus() {
		if (!openBadge) return;
		const isOpen = document.body.getAttribute('data-open') === 'true';
		openBadge.textContent = isOpen ? 'Open | مفتوح' : 'Closed | مغلق';
		openBadge.classList.toggle('badge-open', isOpen);
		openBadge.classList.toggle('badge-closed', !isOpen);
		openBadge.setAttribute('aria-live', 'polite');
	}

	// Small runtime API for future admin toggles or dynamic updates
	window.deepTech = window.deepTech || {};
	window.deepTech.setOpen = function (open) {
		document.body.setAttribute('data-open', open ? 'true' : 'false');
		renderStatus();
	};

	window.deepTech.updateContacts = function (newContacts) {
		Object.assign(contacts, newContacts || {});
		if (emailLink) emailLink.href = `mailto:${contacts.email}?subject=${encode(contacts.emailSubject)}&body=${encode(contacts.emailBody)}`;
		setupWhatsapp(whatsappLink1, contacts.whatsapp1);
		setupWhatsapp(whatsappLink2, contacts.whatsapp2);
		if (facebookLink) facebookLink.href = contacts.facebookUrl;
		setupPhone(phoneLink1, contacts.phone1);
		setupPhone(phoneLink2, contacts.phone2);
		if (mapsLink1) mapsLink1.href = contacts.maps1;
		if (mapsLink2) mapsLink2.href = contacts.maps2;
	};
	function autoCheckStatus() {
		const now = new Date();
		const hour = now.getHours();
		const isOpen = hour >= 8 && hour < 18;
		document.body.setAttribute('data-open', isOpen ? 'true' : 'false');
		renderStatus();
	}

	// Initialization
	autoCheckStatus();
	// Re-check every minute to keep it accurate
	setInterval(autoCheckStatus, 60000);

})();

