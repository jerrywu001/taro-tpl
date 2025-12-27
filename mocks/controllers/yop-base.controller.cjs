const express = require('express');
const router = express.Router();

const banks = require('./data/banks.json');
const branchBanks = require('./data/branchBanks.json');
const allBanks = JSON.parse(JSON.stringify(banks));
const allBranchBanks = JSON.parse(JSON.stringify(branchBanks));

router.post('/master-bank-list', (req, res) => {
  const { bankName = '', bankCode = '' } = req.body;

  let result = [...allBanks];

  if (bankName) {
    result = result.filter(bank => bank.bankName.includes(bankName));
  }

  if (bankCode) {
    result = result.filter(bank => bank.bankCode.includes(bankCode));
  }

  res.json({
    code: 0,
    message: null,
    context: result,
  });
});

/**
 * 查询支行&&大额行号列表
 */
router.post('/bankcode', (req, res) => {
  const { bankCode = '', cnapsName = '', cnapsCode = '' } = req.body;

  let result = [...allBranchBanks];

  if (!bankCode) {
    res.json({
      code: 0,
      message: null,
      context: [],
    });
    return;
  }

  if (cnapsName) {
    result = result.filter(item => item.cnapsName.includes(cnapsName));
  }

  if (cnapsCode) {
    result = result.filter(item => item.cnapsCode.includes(cnapsCode));
  }

  res.json({
    code: 0,
    message: null,
    context: result,
  });
});


module.exports = router;
