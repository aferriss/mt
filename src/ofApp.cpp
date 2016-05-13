#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    w = 1920;
    h = 1080;

    ofSetWindowShape(1920, 1080);
    ofSetFrameRate(30);
    fbPix.allocate(w, h, 3);
    for(int i = 0; i < w*h; i++){
        int r = i*3;
        int g = i*3+1;
        int b = i*3+2;

        fbPix[r] = (int)ofRandom(255);
        fbPix[g] = (int)ofRandom(255);
        fbPix[b] = (int)ofRandom(255);
    }

    feedback.loadData(fbPix);

    emboss.load("shaders/emboss");
    embossFbo.allocate(w, h, GL_RGB);

    gui = new ofxDatGui(ofxDatGuiAnchor::TOP_LEFT);

    embossZoomSlider = gui->addSlider("Emboss Zoom", 0,10);
    embossRotateSlider = gui->addSlider("Roate Zoom", -1,1);
    embossZoomSlider->setValue(1);
    embossRotateSlider->setValue(0);

}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    embossFbo.begin();
        ofTranslate(embossZoomSlider->getValue(),0,embossZoomSlider->getValue());
        ofRotate(embossRotateSlider->getValue(), 1,0,0);

        emboss.begin();
            emboss.setUniformTexture("src_tex_unit0", feedback, 0);
            emboss.setUniform2f("src_tex_offset0", 1.0, 1.0);
            feedback.draw(0,0);
        emboss.end();
    embossFbo.end();

    embossFbo.readToPixels(fbPix);
    feedback.loadData(fbPix);

    embossFbo.draw(0,0, 1920, 1080);

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
