/**
 * Created by elydelacruz on 4/28/16.
 * Refactored 09/28/2018
 */

const

    fs = require('fs'),
    path = require('path'),
    {Readable} = require('stream'),
    {promisify} = require('util'),

    ioDoesFilePathExists = promisify(fs.access),

    newModuleMeta = _module => ({module: _module, methodNames: [], methodNamesByArity: {}}),

    newTopLevelMeta = modulesHashMap => ({
        moduleMetas: Object.keys(modulesHashMap).reduce((agg, key) => {
            agg[key] = newModuleMeta(modulesHashMap[key]);
            return agg;
        }, {}),
        methodNamesByArity: {}
    }),

    updateWithMethodNames = (moduleMeta, topLevelNamesByArity) => {
        const {module: m} = moduleMeta;
        Object.keys(m).forEach(methodName => {
            // Avoid private methods
            if (methodName[0] === '_') {
                return;
            }
            updateMethodByArity(moduleMeta, methodName, topLevelNamesByArity);
            moduleMeta.methodNames.push(methodName);
        });
    },

    updateMethodByArity = (moduleMeta, methodName, topLevelNamesByArity) => {
        const arity = moduleMeta.module[methodName].length,
            {methodNamesByArity} = moduleMeta;
        if (arity === undefined) {
            return;
        }
        if (!methodNamesByArity[arity]) {
            methodNamesByArity[arity] = [];
        }
        topLevelNamesByArity[arity].push(methodName);
        methodNamesByArity[arity].push(methodName);
    },

    populateMeta = meta => {
        const {moduleMetas, methodNamesByArity} = meta;
        // Set empty array for 'method names by arity'
        [0,1,2,3,4,5,6,7,8].forEach(x => { methodNamesByArity[x] = []; });

        // Loop through module metas and populate 'methodNames' and
        //  'methodsByArity' properties
        Object.keys(moduleMetas).forEach(key => {
            updateWithMethodNames(moduleMetas[key], methodNamesByArity);
        });
        return meta;
    },

    methodNamesMdTmpl = (moduleName, moduleMeta) => {
        const {methodNames} = moduleMeta,
            _methodNames = methodNames.slice(0),
            colLen = 72,
            firstMethod = _methodNames.shift(),
            memberNamesMd = _methodNames.reduce((agg, name) => {
                    const lineMetaEntry = agg[agg.length - 1],
                        [lineLen, line] = lineMetaEntry,
                        newLineLen = lineLen + (', ' + name).length,
                        greaterThanColLen = newLineLen >= colLen,
                        linkMd = `[${name}](#${name.toLowerCase()})`
                    ;
                    if (greaterThanColLen) {
                        const newLine = [];
                        newLine.push(linkMd);
                        agg.push([name.length, newLine]);
                    } else {
                        line.push(linkMd);
                        lineMetaEntry[0] = newLineLen;
                    }
                    return agg;
                },
                [[firstMethod ? firstMethod.length : 0, [firstMethod]]]
            )
                .map(([_, line]) => line.join(', '))
                .join(',\n')
        ;
        return `### \`${moduleName}\` members` + '\n```\n' + memberNamesMd + '\n```\n';
    },

    ioEnsureMdDocFileForModule = (moduleName, moduleMeta, pathPrefix) =>
        !moduleMeta ? Promise.resolve() : Promise.all(
            moduleMeta.methodNames.map(memberName => new Promise((resolve, reject) => {
                const expectedFilePath = path.join(pathPrefix, `${memberName}.md`);
                ioDoesFilePathExists(expectedFilePath)

                    // File exists, resolve outer promise
                    .then(resolve)

                    // File doesn't exist create it
                    .catch(() => {
                        const fileContent = `### \`${memberName}\`` +
                            '\n\n@todo - Added documentation here.' +
                            `\n\n[Back to members list](#${moduleName.toLowerCase()}-members)\n`;
                        fs.writeFile(expectedFilePath, fileContent, err => {
                            if (err) { reject(err); }
                            resolve();
                        });
                    })
                ;
            }))
        )
    ;

/**
 * Readstream for pumping out the contents of the "expected" markdown file.
 * @class ModuleMemberListsReadStream
 * @extends stream.Readable
 */
class ModuleMemberListsReadStream extends Readable {
    /**
     * @param streamOptions {Object}
     * @param moduleNameModuleMap
     * @param memberDocFragmentsPath
     */
    constructor({moduleNameModuleMap, memberDocFragmentsPath}, streamOptions) {
        super(Object.assign({
            encoding: 'utf8',
            objectMode: false,
            highWaterMark: 100000
        }, streamOptions));
        this.topMeta = populateMeta(newTopLevelMeta(moduleNameModuleMap));
        this.moduleMetaNames = Object.keys(this.topMeta.moduleMetas);
        this.currIndex = 0;
        this.memberDocFragmentPath = memberDocFragmentsPath;
    }
    _nextKey () {
        return this.moduleMetaNames[this.currIndex++];
    }
    _read () {
        const nextKey = this._nextKey(),
            moduleMeta = this.topMeta.moduleMetas[nextKey];
        ioEnsureMdDocFileForModule(nextKey, moduleMeta, this.memberDocFragmentPath);
        this.push(
            nextKey ?
            methodNamesMdTmpl(nextKey, moduleMeta) :
            null
        );
    }
}

/**
 * @returns {ModuleMemberListsReadStream}
 */
export default (moduleMemberOptions, streamOptions) =>
    new ModuleMemberListsReadStream(moduleMemberOptions, streamOptions);
