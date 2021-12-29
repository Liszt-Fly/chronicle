const { ref } = require('vue')
//> f means fileSystem (the DOM Element)
exports.toggleFileSystem = function toggleFileSystem(f) {

			if (f.style.display == "none") {
				f.style.display = "block"
			} else {
				f.style.display = "none"
			}
		}