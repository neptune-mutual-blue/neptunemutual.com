/**
 * highlight.js Solidity syntax highlighting definition
 *
 * @see https://github.com/isagalaev/highlight.js
 *
 * @package: highlightjs-solidity
 * @author:  Sam Pospischil <sam@changegiving.com>
 * @since:   2016-07-01
 */

import solidityGrammar from './languages/solidity'

function registerLanguages(hljs) {
  hljs.registerLanguage('solidity', solidityGrammar)
}

export { registerLanguages }