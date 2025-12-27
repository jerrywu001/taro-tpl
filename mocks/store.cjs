/**
 * 中央数据存储模块
 * 用于在不同控制器之间共享和同步数据
 */

// 初始化数据存储
const store = {
  // 会员数据（会员实名认证信息）
  members: require('./routes/data/memberRealname.json'),

  // 收件单数据（包含会员信息）
  receiveDetail: require('./routes/data/receive-detail.json'),

  /**
   * 更新会员的认证状态
   * @param {number} memberId - 会员ID
   * @param {number} authStatus - 认证状态（0=未认证, 1=认证成功）
   */
  updateMemberAuthStatus(memberId, authStatus) {
    // 更新会员数据
    const memberIdx = this.members.findIndex(m => m.memberId === String(memberId));
    if (memberIdx >= 0) {
      this.members[memberIdx].auditStatus = authStatus;
    }

    // 同时更新收件单中的会员认证状态
    if (this.receiveDetail.memberInfo && this.receiveDetail.memberInfo.id === memberId) {
      this.receiveDetail.memberInfo.authStatus = authStatus;
    }
  },

  /**
   * 获取会员信息
   * @param {number} memberId - 会员ID
   * @returns {object} 会员信息
   */
  getMember(memberId) {
    return this.members.find(m => m.memberId === String(memberId));
  },

  /**
   * 获取收件单详情
   * @returns {object} 收件单详情
   */
  getReceiveDetail() {
    return this.receiveDetail;
  },
};

module.exports = store;
