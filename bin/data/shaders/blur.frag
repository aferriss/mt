uniform sampler2DRect src_tex_unit0;
uniform float imgWidth;
uniform float imgHeight;
//uniform float time;
uniform float speed;
float texelWidth =  2.0  ; //size of one texel;
uniform vec2 mouse;
uniform vec2 res;

// NOTE: we should initialize these arrays up here
//               but that syntax doesn't work on OSX for some reason
//               so we set these array values in main(), which
//       is bad for performance, but works on OSX

float kernel[9];
vec2 offset[9];

float step_w = 1.0;
float step_h = 1.0;

void main() {
    
    
    vec2 tc = gl_TexCoord[0].st;
    vec4 input0 = texture2DRect(src_tex_unit0,tc);
    
    /*
    vec2 x1 = vec2(1.0,0.0);
    vec2 y1 = vec2(0.0,1.0);
    
    input0 += texture2DRect(src_tex_unit0, tc+x1);
    input0 += texture2DRect(src_tex_unit0, tc-x1);
    input0 += texture2DRect(src_tex_unit0, tc+y1);
    input0 += texture2DRect(src_tex_unit0, tc-y1);
    
    input0*= vec4(0.2);
    */
    float time = 20.6483;
    
    float co = cos(time*speed);
    float si = sin(time*speed);
    
    mat4 hueRotation =
    mat4(0.299,  0.587,  0.114, 0.0,
         0.299,  0.587,  0.114, 0.0,
         0.299,  0.587,  0.114, 0.0,
         0.000,  0.000,  0.000, 1.0) +
    
    mat4(0.701, -0.587, -0.114, 0.0,
         -0.299,  0.413, -0.114, 0.0,
         -0.300, -0.588,  0.886, 0.0,
         0.000,  0.000,  0.000, 0.0) * co +
    
    mat4(0.168,  0.330, -0.497, 0.0,
         -0.328,  0.035,  0.292, 0.0,
         1.250, -1.050, -0.203, 0.0,
         0.000,  0.000,  0.000, 0.0) * si;
    
    
    float tl = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2(-1.0, -1.0)).x);   // top left
    float  l = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2(-1.0,  0.0)).x);   // left
    float bl = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2(-1.0,  1.0)).x);   // bottom left
    float  t = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2( 0.0, -1.0)).x);   // top
    float  b = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2( 0.0,  1.0)).x);   // bottom
    float tr = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2( 1.0, -1.0)).x);   // top right
    float  r = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2( 1.0,  0.0)).x);   // right
    float br = abs(texture2DRect(src_tex_unit0, gl_TexCoord[0].st + texelWidth * vec2( 1.0,  1.0)).x);   // bottom right
	// Compute dx using Sobel:
    //           -1 0 1
    //           -2 0 2
    //           -1 0 1
    float dX = tr + 2.0*r + br -tl - 2.0*l - bl;
    // Compute dy using Sobel:
    //           -1 -2 -1
    //            0  0  0
    //            1  2  1
    float dY = bl + 2.0*b + br -tl - 2.0*t - tr;
    
    
    
    vec4 color = vec4(normalize(vec3(dX,dY,1.0/3.0)),1.0);
    
    color*=0.5;
    color+=0.5;
    
    vec2 displacement = vec2(dX, dY)*4.0;
//    float light = pow( max(1.0 -distance(  gl_TexCoord[0].st *res, displacement),0.0),4.0);
//    float light = pow(max(1.0-distance(0.5+(gl_TexCoord[0].st-0.5)*vec2(res.x,res.y)*4.0 + displacement, 0.5+(mouse-0.5)*vec2(res.x,res.y)*4.0),0.0),4.0);
//    vec4 rd = vec4(texture2DRect(src_tex_unit0, gl_TexCoord[0].st+vec2(dX,dY)*vec2(1.0/1280.0,1.0/720.0)*8.).x)*vec4(0.7,1.5,2.0,2.0)-vec4(0.3,1.0,1.0,1.0);
//    gl_FragColor = mix(color,vec4(8.0,6.0,2.0,1.0), light*0.75*vec4(1.0-texture2DRect(src_tex_unit0,gl_TexCoord[0].st+vec2(dX,dY)*vec2(1.0/1280.0,1.0/720.0)*8.0).x));
    
    gl_FragColor = color  * hueRotation - 0.1;
//    gl_FragColor.rgb += vec3(light*1000.0);
}