export class markersDB {
  static Markers = [
    { position:{
      lat: 28.51373879665654, 
      lng: -81.36323055491305 },
    label: { 
      text:'Good'},
      icon:{
          path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
          fillColor: 'blue',
          fillOpacity: 0.6,
          scale: 300
      }},
      { position:{
        lat:28.565225490654658 , 
        lng: -81.32972717285156 },
      label: { 
        text:'Good'},
        icon:{
            path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
            fillColor: 'purple',
            fillOpacity: 0.6,
            scale: 300
        }
        },
        { position:{
          lat: 28.563504017948954, 
          lng: -81.352415888165  },
        label: { 
          text:'Good'},
          shape:'circle',
            height:30,
            width:30, 
            color:'purple'
          },
          { position:{
            lat:28.536145562030278, 
            lng:  -81.38840936322703},
          label: { 
            text:'Non-Compliant'},
            shape:'circle',
              height:30,
              width:30, 
              color:'red'
            },
            { position:{
              lat: 28.530933076019487, 
              lng: -81.40116771921969  },
            label: { 
              text:'Non-Compliant'},
              shape: 'circle',
                height:30,
                width:30, 
                color:'red'
              },
              { position:{
                lat: 28.56290094390906, 
                lng: -81.36941036448336 },
              label: { 
                text:'Non-Compliant'},
                shape:'circle',
                  height:30,
                  width:30, 
                  color:'red'
                },
                { position:{
                  lat: 28.555060666949633, 
                  lng:  -81.3879497931943 },
                label: { 
                  text:'Poor'},
                  shape:'circle',
                    height:30,
                    width:30, 
                    color:'yellow'
                  },
                  { position:{
                    lat:28.531234705011673,
                    lng: -81.39172634348726 },
                  label: { 
                    text:'Poor'},
                    shape:'circle',
                      height:30,
                      width:30, 
                      color:'yellow'
                    },
                    { position:{
                      lat: 28.561393243691317,  
                      lng: -81.39069637522555 },
                    label: { 
                      text:'Poor'},
                      shape:{
                        type: 'circle',
                        height:30,
                        width:30, 
                        color:'yellow'
                      }},
  ];
}
