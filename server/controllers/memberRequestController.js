import MemberRequest from '../models/MemberRequest.js';
import User from '../models/User.js';

export const createRequest = async (req, res) => {
    try {
        const { userId, email, name, plan } = req.body;

        const existingRequest = await MemberRequest.findOne({ userId, status: 'pending' });
        if (existingRequest) {
            return res.status(400).json({ message: 'Bạn đã có một yêu cầu đang chờ duyệt' });
        }

        const newRequest = new MemberRequest({
            userId,
            email,
            name,
            plan
        });

        await newRequest.save();
        res.status(201).json({ message: 'Gửi yêu cầu thành công', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const requests = await MemberRequest.find({ status: 'pending' }).populate('userId', 'username email');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const approveRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await MemberRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
        }

        request.status = 'approved';
        await request.save();

        // Cập nhật trạng thái isMember của User
        await User.findByIdAndUpdate(request.userId, { isMember: true });

        // Cập nhật email đã duyệt vào DB (tùy chọn) hoặc đơn giản là trả về email trong response
        res.status(200).json({ 
            message: 'Đã duyệt yêu cầu hội viên',
            email: request.email // Trả về email để Frontend có thể sử dụng nếu cần
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
