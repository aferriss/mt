uniform sampler2DRect src_tex_unit0;
uniform float imgWidth;
uniform float imgHeight;

// NOTE: we should initialize these arrays up here
//               but that syntax doesn't work on OSX for some reason
//               so we set these array values in main(), which
//       is bad for performance, but works on OSX

float kernel[9];
vec2 offset[9];

float step_w = 0.1;
float step_h = 0.1;

void main() {
    
    
    vec2 tc = gl_TexCoord[0].st;
    vec4 input0 = texture2DRect(src_tex_unit0,tc);
    
    vec2 x1 = vec2(1.00005,0.0);
    vec2 y1 = vec2(0.0,1.00005);
    
    input0 += texture2DRect(src_tex_unit0, tc+x1);
    input0 += texture2DRect(src_tex_unit0, tc-x1);
    input0 += texture2DRect(src_tex_unit0, tc+y1);
    input0 += texture2DRect(src_tex_unit0, tc-y1);
    
    
    input0*= vec4(0.2);
    

    
    offset[0] = vec2(-step_w, -step_h);
    offset[1] = vec2(0.0, -step_h);
    offset[2] = vec2(step_w, -step_h);
    offset[3] = vec2(-step_w, 0.0);
    offset[4] = vec2(0.0, 0.0);
    offset[5] = vec2(step_w, 0.0);
    offset[6] = vec2(-step_w, step_h);
    offset[7] = vec2(0.0, step_h);
    offset[8] = vec2(step_w, step_h);
    
    
    /* SHARPEN KERNEL
     0 -1  0
     -1  5 -1
     0 -1  0
     */
    
    kernel[0] = -1.0; kernel[1] = 0.0; kernel[2] = 0.0;
    kernel[3] = 0.0; kernel[4] = -1.0; kernel[5] = 0.0;
    kernel[6] = 0.0; kernel[7] = 0.0; kernel[8] = 2.0;
    
    vec4 sum = input0;
    int i;
    
    for (i = 0; i < 9; i++) {
        vec4 color = texture2DRect(src_tex_unit0, gl_TexCoord[0].st + offset[i]);
        sum += color * kernel[i];
    }
    
//    sum /= 9.0;
    
    //sum = vec4(normalize(vec3(sum.r,sum.g,1.0/100.0)),1.0);
    //sum*=0.5;
    //sum+=0.5;
    
    
    gl_FragColor = sum - vec4(0.05,0.05,0.05,0.0) ;
    //gl_FragColor =  texture2DRect(src_tex_unit0, gl_TexCoord[0].st);
}