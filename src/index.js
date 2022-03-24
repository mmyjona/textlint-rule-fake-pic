export default function (context, options = {}) {
  const { Syntax, RuleError, report, getSource } = context;
  let shouldHavePic = 0;
  let shouldHavePicIndex = null;
  let problemNode = null;
  return {
    [Syntax.Str](node) {
      const text = getSource(node); // Get text
      const matches = /下图/g.exec(text); // Found "bugs"
      if (matches) {
        //console.log("should have pic");
        //console.log(shouldHavePic);
        if (shouldHavePic === 1) {
          const ruleError = new RuleError("虚假的如下图", {
            index: shouldHavePicIndex, // padding of index
          });
          report(problemNode, ruleError);
        }
        shouldHavePicIndex = matches.index;
        shouldHavePic = 1;
        problemNode = node;
      } else {
        return;
      }
    },
    [Syntax.Image](node) {
      //console.log("found pic!");
      shouldHavePic = 2;
      //console.log(shouldHavePic);
    },
    [Syntax.Header](node) {
        if (shouldHavePic === 1) {
            const ruleError = new RuleError("虚假的如下图？", {
              index: shouldHavePicIndex, // padding of index
            });
            report(problemNode, ruleError);
          }
          shouldHavePic = 0;
    },
    [Syntax.Document](node) {
      if (shouldHavePic === 1) {
        const ruleError = new RuleError("虚假的如下图？", {
          index: shouldHavePicIndex, // padding of index
        });
        report(problemNode, ruleError);
      }
      shouldHavePic = 0;
    },
  };
}
