const ROLES = {
	anonymous:           0,
	admin:      Math.pow(2, 0),
	registered: Math.pow(2, 1),
	beta:       Math.pow(2, 2),
	plan1:      Math.pow(2, 3),
	plan2:      Math.pow(2, 4),
	plan3:      Math.pow(2, 5),
	suspended:  Math.pow(2, 29),
	super:      Math.pow(2, 30)
};

export default class AuthUtils {
	
		constructor() {
		}
		
		static ROLES(){
			return ROLES;
		} 
		
		hasRequiredRoles(uroles, rroles) {
			'use strict';

			var filtered = (uroles & rroles); /* jshint ignore:line */
			return !(filtered ^ rroles) /* jshint ignore:line */

		};
		
		// NOTE: returns false when a role in uroles is matched in rroles
		hasNoDeniedRoles(uroles, rroles) {
			'use strict';

			return !(uroles & rroles) /* jshint ignore:line */

		};
		
		isAdmin(roles){
			'use strict';

			var adminRole = ROLES.admin | ROLES.super;
			return !!(roles & adminRole); /* jshint ignore:line */

		};
		
		isBeta(roles){

			var betaRole = ROLES.beta;
			return !!(roles & betaRole);

		};
}