define(function () {
	function Combat(p1, p2) {
		this._p1 = p1;
		this._p2 = p2;

		this._initiativeTest = function () {
			var p1Initiative = this._p1.initiative;
			var p2Initiative = this._p2.initiative;

			console.log('Initiative test start.');

			if (p1Initiative > p2Initiative) {
				console.log(this._p1.name + ' start the combat.');
				this._turn(this._p1, this._p2);
			} else if (p1Initiative < p2Initiative) {
				console.log(this._p2.name + ' start the combat.');
				this._turn(this._p2, this._p1);
			} else if (p1Initiative === p2Initiative) {
				if (this._p1.attributes.hab.value > this._p2.attributes.hab.value) {
					console.log(this._p1.name + ' start the combat, after initiative draw.');
					this._turn(this._p1, this._p2);
				} else if (this._p1.attributes.hab.value < this._p2.attributes.hab.value) {
					console.log(this._p2.name + ' start the combat, after initiative draw.');
					this._turn(this._p2, this._p1);
				} else {
					console.log(this._p1.name + ' and ' + this._p2.name + ' attack in the same time.');
					this._turn(this._p1, this._p2);
					this._turn(this._p2, this._p1);
				}
			}
		};

		this._turn = function (pAtk, pDef) {
			if (!pDef.dodge(pAtk)) {
				var hit = Math.abs(pAtk.atkPower - pDef.defPower);

				pDef.life = hit;
				console.log(pDef.name + ' received ' + hit + ' hit points and has ' + pDef.life + ' life points.');
			}
		};
	}

	Combat.prototype.constructor = Combat;

	Combat.prototype.start = function () {
		console.log('Combat start.');
		this._initiativeTest();
		console.log('Combat end.');
	};

	return Combat;
});