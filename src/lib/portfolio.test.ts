import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  buildTelHref,
  formatDisplayPhone,
  getActiveSectionId,
  isPlaceholderUrl,
  resolveProjectLink,
} from './portfolio';
import { PROJECTS } from '../data/projects';
import { SKILL_GROUPS } from '../data/skills';
import {
  CONTACT_PROFILE,
  EDUCATION_ENTRIES,
  EXPERIENCE_ENTRIES,
  NAV_ITEMS,
} from '../data/experience';

test('isPlaceholderUrl identifies editable placeholders vs live HTTPS URLs', () => {
  assert.equal(isPlaceholderUrl('CONFIGURE_MOTION_SOURCE_URL'), true);
  assert.equal(isPlaceholderUrl('https://example.com/demo'), true);
  assert.equal(isPlaceholderUrl('https://github.com/your-username/repo'), true);
  assert.equal(isPlaceholderUrl('#'), true);
  assert.equal(isPlaceholderUrl(''), true);
  assert.equal(isPlaceholderUrl('javascript:alert(1)'), true);
  assert.equal(isPlaceholderUrl('https://lucent-syrniki-8b37b2.netlify.app/'), false);
  assert.equal(isPlaceholderUrl('https://funny-cannoli-ed0052.netlify.app/'), false);
});

test('resolveProjectLink returns configured href for live Netlify deployments and placeholder notice for unconfigured source URLs', () => {
  const motionLive = resolveProjectLink(PROJECTS[0].liveUrl, 'liveUrl');
  assert.equal(motionLive.isConfigured, true);
  assert.equal(motionLive.href, 'https://lucent-syrniki-8b37b2.netlify.app/');

  const loopdeskLive = resolveProjectLink(PROJECTS[1].liveUrl, 'liveUrl');
  assert.equal(loopdeskLive.isConfigured, true);
  assert.equal(loopdeskLive.href, 'https://funny-cannoli-ed0052.netlify.app/');

  const unconfiguredSource = resolveProjectLink(PROJECTS[0].sourceUrl, 'sourceUrl');
  assert.equal(unconfiguredSource.isConfigured, false);
  assert.equal(unconfiguredSource.href, null);
  assert.match(unconfiguredSource.placeholderNote, /sourceUrl/);
});

test('buildMailtoHref formats clean mailto links with encoded query parameters', () => {
  assert.equal(
    buildMailtoHref('parasv612@gmail.com'),
    'mailto:parasv612@gmail.com'
  );
  assert.equal(
    buildMailtoHref('parasv612@gmail.com', 'Project Inquiry'),
    'mailto:parasv612@gmail.com?subject=Project%20Inquiry'
  );
});

test('buildTelHref and formatDisplayPhone format phone links cleanly', () => {
  assert.equal(buildTelHref('7678427036'), 'tel:7678427036');
  assert.equal(buildTelHref('+91 76784-27036'), 'tel:+917678427036');
  assert.equal(formatDisplayPhone('7678427036'), '76784 27036');
});

test('getActiveSectionId resolves active anchor accurately across scroll positions', () => {
  const sections = [
    { id: 'home', top: 0 },
    { id: 'work', top: 900 },
    { id: 'about', top: 2400 },
    { id: 'contact', top: 4100 },
  ];

  assert.equal(getActiveSectionId(0, sections, 160), 'home');
  assert.equal(getActiveSectionId(739, sections, 160), 'home');
  assert.equal(getActiveSectionId(740, sections, 160), 'work');
  assert.equal(getActiveSectionId(2300, sections, 160), 'about');
  assert.equal(getActiveSectionId(4050, sections, 160), 'contact');
});

test('portfolio datasets contain live URLs, multi-screen captures, and accurate entries', () => {
  assert.equal(PROJECTS.length, 2);
  assert.equal(PROJECTS[0].name, 'Motion');
  assert.equal(PROJECTS[0].screens.length, 3);
  assert.equal(PROJECTS[1].name, 'LoopDesk');
  assert.equal(PROJECTS[1].screens.length, 3);
  assert.equal(SKILL_GROUPS.length, 3);
  assert.equal(EXPERIENCE_ENTRIES.length, 3);
  assert.equal(EDUCATION_ENTRIES.length, 2);
  assert.equal(NAV_ITEMS.length, 6);
  assert.equal(CONTACT_PROFILE.email, 'parasv612@gmail.com');
  assert.equal(CONTACT_PROFILE.phone, '7678427036');
});
