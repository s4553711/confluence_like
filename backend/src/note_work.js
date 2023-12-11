const fs = require('fs');
const crypto = require('crypto');
const targetD = 'uploads'

const extractImg = (orig_str, ar) => {
	let final_str = '';
	let next_pos = 0;
	for (let r of ar) {
		if (r[1].startsWith("data:")) {
			let replace_start = r[0].indexOf("src=") + 5;
			let replace_end = r[1].length;
			const [header, data] = r[1].split(",");
			const [prefix, dtype, codec]  = header.split(/:|;/);

			if (dtype == 'image/png') {
				const buffer = Buffer.from(data, "base64");
				const imageF = crypto.randomUUID();
				fs.writeFileSync(`${targetD}/${imageF}.png`, buffer);
				final_str += orig_str.slice(next_pos, r.index) +
					r[0].slice(0, replace_start)+"/api/resources/"+imageF+".png"+r[0].slice(replace_start + replace_end);
				next_pos = r.index + r[0].length;
			} else {
				//final_str += r[0];
				final_str += orig_str.slice(next_pos, r.index+r[0].length);
				next_pos = r.index+r[0].length;
			}
		} else {
			final_str += orig_str.slice(next_pos, r.index+r[0].length);
			next_pos = r.index+r[0].length;
		}
	}
	if (next_pos != orig_str.length) {
		final_str += orig_str.slice(next_pos);
	}

	return final_str;
}

const proc_img = (str) => {
	const regexp = '<img[^>]*src="([^"]+)"[^>]*>';
	const match = str.matchAll(regexp);
	let ret = [...match];
	let proc_ret = extractImg(str, ret);
	return proc_ret;
}

module.exports = {
	proc_img
}
