function atFuncM03001_logout(){
	RKCommon.member.logout(function(){
		JGService.forwardService(RKCommon.requestURLKey_root);
	});
}

