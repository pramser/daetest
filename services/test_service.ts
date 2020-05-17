import testRepo from "../repositories/test_repository.ts";

export const getAllTests = async () => {
  const tests = await testRepo.selectAll();

  var result = new Array();

  tests.rows.map((test: any) => {
    var obj: any = new Object();

    tests.rowDescription.columns.map((el: any, i: any) => {
      obj[el.name] = test[i];
    });
    result.push(obj);
  });

  return result;
};

export const getSingleTest = async (testId: number) => {
  const tests = await testRepo.selectById(testId);

  var obj: any = new Object();
  tests.rows.map((test: any) => {
    tests.rowDescription.columns.map((el: any, i: any) => {
      obj[el.name] = test[i];
    });
  });

  return obj;
};
