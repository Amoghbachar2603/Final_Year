from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configure the upload folder and allowed extensions
UPLOAD_FOLDER = './temp'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the temp folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video_file = request.files['video']

    if video_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Secure the filename
    filename = secure_filename(video_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Save the video to the temp folder
    video_file.save(file_path)

    # Simulate processing (this can be replaced with actual processing logic)
    print(f"Video saved at {file_path}. Ready for processing.")

    return jsonify({'message': 'Video uploaded successfully', 'file_path': file_path}), 200

if __name__ == '__main__':
    app.run(debug=True)
