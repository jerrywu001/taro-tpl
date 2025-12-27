const express = require('express');
const router = express.Router();

// Import data
const memberList = require('../routes/data/memberList.json');
const memberDetails = require('../routes/data/memberDetails.json');
const receiveDetail = require('../routes/data/receive-detail.json');

/**
 * 会员列表查询 - 小程序端
 * 支持分页和关键词搜索（会员名称或手机号）
 */
router.post('/applet-page', (req, res) => {
  let all = JSON.parse(JSON.stringify(memberList.data || []));

  const { page = 1, size = 50, key } = req.body || {};

  // 关键词搜索（模糊匹配会员名称或手机号）
  if (key) {
    all = all.filter((item) => {
      const keyword = String(key).toLowerCase();
      const memberName = String(item.memberName || '').toLowerCase();
      const phone = String(item.phone || '');

      return memberName.includes(keyword) || phone.includes(keyword);
    });
  }

  const total = all.length;
  const start = (Number(page) - 1) * Number(size);
  const end = start + Number(size);
  const data = all.slice(start, end);

  res.json({
    code: 0,
    message: null,
    context: { total, data },
    traceId: '',
    spanId: '',
  });
});

/**
 * 会员详情
 */
router.get('/detail', (req, res) => {
  const { id } = req.query;

  const detail = memberDetails.find((item) => item.id === Number(id));

  if (!detail) {
    res.json({
      code: 1,
      message: '会员不存在',
      context: null,
    });
    return;
  }

  // 确保返回完整的IMemberDetail结构
  const response = {
    id: detail.id,
    base: {
      id: detail.id,
      ...detail.base,
    },
    bankCards: detail.bankCards || [],
    certification: detail.certification || {
      realName: '',
      realPhone: '',
      idNo: '',
      idCardFrontImage: '',
      idCardBackImage: '',
      idCardValidDate: '',
      certificationStatus: '',
    },
  };

  res.json({
    code: 0,
    message: null,
    context: response,
    traceId: '',
    spanId: '',
  });
});

/**
 * 新增会员
 */
router.post('/add', (req, res) => {
  const { base, certification } = req.body;

  // 验证必填字段
  if (!base || !base.memberName || !base.phone) {
    res.json({
      code: 1,
      message: '会员名称和手机号不能为空',
      context: null,
    });
    return;
  }

  // 生成新会员ID（取最大ID + 1）
  const maxId = Math.max(
    ...memberList.data.map((item) => item.id),
    ...memberDetails.map((item) => item.id),
  );
  const newId = maxId + 1;

  // 生成会员编号
  const newCode = base.code || `M${new Date().getFullYear()}${String(newId).padStart(5, '0')}`;

  // 添加到会员列表
  const newMember = {
    id: newId,
    memberName: base.memberName,
    code: newCode,
    phone: base.phone,
    avatar: base.avatar || 'https://picsum.photos/200/200',
    sex: base.sex !== undefined ? base.sex : 0,
    birthDate: base.birthDate || '',
    idNo: certification?.idNo || '',
  };
  memberList.data.unshift(newMember);
  memberList.total = memberList.data.length;

  // 添加到会员详情
  const newDetail = {
    id: newId,
    base: {
      id: newId,
      memberName: base.memberName,
      code: newCode,
      phone: base.phone,
      email: base.email || '',
      avatar: base.avatar || 'https://picsum.photos/200/200',
      sex: base.sex !== undefined ? base.sex : 0,
      shopId: base.shopId || 1,
      shopName: base.shopName || '吉嘉名品汇嘉定店',
      birthDate: base.birthDate || '',
      status: base.status !== undefined ? base.status : 1,
      seller: base.seller !== undefined ? base.seller : 0,
      remark: base.remark || '',
    },
  };
  memberDetails.unshift(newDetail);

  // 返回完整的IMemberDetail对象
  res.json({
    code: 0,
    message: null,
    context: newDetail,
    traceId: '',
    spanId: '',
  });
});

/**
 * 编辑会员
 */
router.post('/edit', (req, res) => {
  const { id, base, certification } = req.body;

  // 验证ID
  if (!id) {
    res.json({
      code: 1,
      message: '会员ID不能为空',
      context: null,
    });
    return;
  }

  // 验证必填字段
  if (!base || !base.memberName || !base.phone) {
    res.json({
      code: 1,
      message: '会员名称和手机号不能为空',
      context: null,
    });
    return;
  }

  // 查找并更新会员详情
  const detailIndex = memberDetails.findIndex((item) => item.id === Number(id));

  if (detailIndex === -1) {
    res.json({
      code: 1,
      message: '会员不存在',
      context: null,
    });
    return;
  }

  // 更新详情数据
  if (base) {
    memberDetails[detailIndex].base = {
      ...memberDetails[detailIndex].base,
      ...base,
      id: Number(id), // 确保ID不变
    };
  }

  if (certification) {
    memberDetails[detailIndex].certification = {
      ...memberDetails[detailIndex].certification,
      ...certification,
    };
  }

  // 同步更新会员列表数据
  const listIndex = memberList.data.findIndex((item) => item.id === Number(id));
  if (listIndex !== -1 && base) {
    memberList.data[listIndex] = {
      ...memberList.data[listIndex],
      memberName: base.memberName || memberList.data[listIndex].memberName,
      code: base.code || memberList.data[listIndex].code,
      phone: base.phone || memberList.data[listIndex].phone,
      avatar: base.avatar || memberList.data[listIndex].avatar,
      sex: base.sex !== undefined ? base.sex : memberList.data[listIndex].sex,
      birthDate: base.birthDate || memberList.data[listIndex].birthDate,
    };

    // 同步身份证号
    if (certification && certification.idNo) {
      memberList.data[listIndex].idNo = certification.idNo;
    }
  }

  // 返回成功
  res.json({
    code: 0,
    message: null,
    context: {},
    traceId: '',
    spanId: '',
  });
});

/**
 * 会员实名认证
 * 模拟真实的认证逻辑：验证身份证号、手机号、图片等
 * 认证成功后会同步更新 memberList 中的 idNo
 */
router.post('/certification', (req, res) => {
  const {
    memberId,
    realName,
    idNo,
    idCardAddress,
    idCardValidDate,
    realPhone,
    idCardFrontImage,
    idCardBackImage,
  } = req.body;

  // 验证必填字段
  if (!memberId) {
    res.json({
      code: 1,
      message: '会员ID不能为空',
      context: null,
    });
    return;
  }

  // 查找会员
  const detailIndex = memberDetails.findIndex((item) => item.id === Number(memberId));

  if (detailIndex === -1) {
    res.json({
      code: 1,
      message: '会员不存在',
      context: null,
    });
    return;
  }

  memberDetails[detailIndex].certification = {
    realName,
    idNo,
    idCardAddress: idCardAddress || '',
    idCardValidDate: idCardValidDate || '',
    realPhone,
    idCardFrontImage,
    idCardBackImage,
    certificationStatus: 'CERTIFIED',
    certificationTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  // 同步更新 memberList 中的 idNo
  const listIndex = memberList.data.findIndex((item) => item.id === Number(memberId));
  if (listIndex !== -1) {
    memberList.data[listIndex].idNo = idNo;
  }

  // ✅ 关键：同时更新 receiveDetail 中的会员认证状态
  if (receiveDetail.memberInfo && receiveDetail.memberInfo.id === Number(memberId)) {
    receiveDetail.memberInfo.authStatus = 1;  // 认证成功
  }

  res.json({
    code: 0,
    message: null,
  });
});

/**
 * 新增银行卡
 * 模拟真实的银行卡添加逻辑：验证会员、生成新ID、添加到bankCards数组
 */
router.post('/bank-card/add', (req, res) => {
  const { memberId, name, idNo, phone, bankName, bankCode, bankBranch, bankBranchCode, bankAccount } = req.body;

  // 验证必填字段
  if (!memberId) {
    res.json({
      code: 1,
      message: '会员ID不能为空',
      context: null,
    });
    return;
  }

  // 查找会员
  const memberIndex = memberDetails.findIndex((item) => item.id === Number(memberId));

  if (memberIndex === -1) {
    res.json({
      code: 1,
      message: '会员不存在',
      context: null,
    });
    return;
  }

  // 生成新的银行卡ID（取所有现存卡的最大ID + 1）
  let maxBankCardId = 3000;
  memberDetails.forEach((member) => {
    if (member.bankCards && member.bankCards.length > 0) {
      const cardMaxId = Math.max(...member.bankCards.map((card) => card.id));
      if (cardMaxId > maxBankCardId) {
        maxBankCardId = cardMaxId;
      }
    }
  });
  const newCardId = maxBankCardId + 1;

  // 检查同一会员是否已有相同的银行账号
  const member = memberDetails[memberIndex];
  if (member.bankCards && member.bankCards.length > 0) {
    const existingCard = member.bankCards.find((card) => card.bankAccount === bankAccount);
    if (existingCard) {
      res.json({
        code: 1,
        message: '该银行账号已绑定',
        context: null,
      });
      return;
    }
  }

  member.bankCards = member.bankCards || [];

  const newBankCard = {
    id: newCardId,
    name,
    idNo,
    phone,
    bankName,
    bankCode,
    bankBranch,
    bankBranchCode,
    bankAccount,
    status: 1, // 默认启用
  };

  member.bankCards.push(newBankCard);

  res.json({
    code: 0,
    message: null,
    context: newBankCard,
  });
});

/**
 * 删除银行卡
 * 模拟真实的银行卡删除逻辑：根据 bankCards 中的 id 进行删除
 */
router.post('/bank-card/delete', (req, res) => {
  const { id } = req.query;

  // 验证必填字段
  if (!id) {
    res.json({
      code: 1,
      message: '银行卡ID不能为空',
      context: null,
    });
    return;
  }

  // 查找并删除银行卡
  let found = false;
  const bankCardId = Number(id);

  memberDetails.forEach((member) => {
    if (member.bankCards && member.bankCards.length > 0) {
      // 查找该ID的银行卡
      const cardIndex = member.bankCards.findIndex((card) => card.id === bankCardId);

      if (cardIndex !== -1) {
        // 删除该银行卡
        member.bankCards.splice(cardIndex, 1);
        found = true;
      }
    }
  });

  if (!found) {
    res.json({
      code: 1,
      message: '银行卡不存在',
      context: null,
    });
    return;
  }

  // 删除成功
  res.json({
    code: 0,
    message: null,
    context: {},
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
