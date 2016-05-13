const CONFERENCE_LISTNER_FCT_NAMES = [
  { 
    storeFctAdd:'addListListener',
    storeFctRemove:'removeListListener',
    listenerFct: '_setConferences'
  },
  { 
    storeFctAdd:'addReadListener',
    storeFctRemove:'removeReadListener',
    listenerFct: '_getConference'
  },
  {
    storeFctAdd:'addDeletedListener',
    storeFctRemove:'removeDeletedListener',
    listenerFct: '_deletedConference'
  },
];

this.conferenceListnerFctRemoveNames = null;

// Conference
this.conferenceListnerFctRemoveNames = 
  sectionHelper.addListeners(ConferenceStore, CONFERENCE_LISTNER_FCT_NAMES, this);

// Conference
sectionHelper.removeListeners(ConferenceStore, this.conferenceListnerFctRemoveNames);